import { FunctionDeclaration } from '@babel/types';
import cheerio from 'cheerio';
import esprima from 'esprima';
import ESTree, { CallExpression, ExpressionStatement, Identifier, Literal, MemberExpression, ObjectExpression, Property, SpreadElement } from 'estree';
import acorn from 'acorn';
import axios from 'axios';
import path from 'path';

export async function Parse(host: string) {
    const res = await axios({
        url: `http://${host}/st`
    });
    const $ = cheerio.load(res.data);
    const code = $('script').text();
    const Program = acorn.parse(code, { ecmaVersion: 'latest' }) as any as ESTree.Program;
    let body = Program.body;
    let functions: ESTree.FunctionDeclaration[] = body.filter(x => x.type == 'FunctionDeclaration') as any;
    let school_ra = functions.find(x => x.id?.name == 'school_ra');
    let sc_disp = functions.find(x => x.id?.name == 'sc_disp');
    if (!(school_ra && sc_disp)) return undefined;
    return {
        ...ParseSchoolRa(school_ra.body),
        ...ParseScDisp(sc_disp.body)
    }
}

export async function ParseServer() {
    const res = await axios({
        url: 'http://xn--s39aj90b0nb2xw6xh.kr/'
    });
    const $ = cheerio.load(res.data);
    const url = $('frame').attr('src');
    if (!url) return undefined;
    return {
        url,
        host: new URL(url).host
    };
}

export function ParseSchoolRa(node: ESTree.BlockStatement) {
    let ajaxCall = (node.body.find(x => x.type == 'ExpressionStatement') as ExpressionStatement).expression as CallExpression;
    let callee = (ajaxCall.callee as MemberExpression)
    if (!((callee.object as Identifier).name == '$') && ((callee.property as Identifier).name == 'ajax'))
        throw new Error('Parse Failed');
    let argument = ajaxCall.arguments.find(x => x.type == 'ObjectExpression') as ObjectExpression;
    let findUrlKey = function (property: SpreadElement | Property) {
        if (property.type != 'Property')
            return false;
        if (property.key.type != 'Identifier')
            return false;
        if (property.key.name != 'url')
            return false;
    }
    let urlKeyProperty = argument.properties.find(findUrlKey) as Property;
    if (urlKeyProperty.value.type != 'BinaryExpression')
        throw new Error('Parse Failed');
    let left = urlKeyProperty.value.left;
    if (left.type != 'Literal')
        throw new Error('Parse Failed');
    if (!left.raw)
        throw new Error('Parse Failed');
    let parsed = left.raw.split('/')[1].split('l')[0].split('?');
    return {
        id: parsed[0],
        search: parsed[1],
        search_path: path.resolve('/', left.raw)
    };
}

export function ParseScDisp(node: ESTree.BlockStatement) {
    const findScDataCall = function (statements: ESTree.Statement) {
        if (statements.type != 'ExpressionStatement') return false;
        if (statements.expression.type != 'CallExpression') return false;
        if (statements.expression.callee.type != 'Identifier') return false;
        if (statements.expression.callee.name != 'sc_data') return false;
        return true;
    }
    let scDataCall = (node.body.find(findScDataCall) as ExpressionStatement)
    let expression = (scDataCall.expression as CallExpression)
    let argument = expression.arguments[0] as Literal;
    return {
        data: argument.raw?.substring(0, -1)
    };
}