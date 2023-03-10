import * as walk from "acorn-walk";

class Code {
  extractOnce(elem) {
     let rawParams = elem.params;
    let extract = new Code().extractOnce

    
    let params = []
    if (rawParams.length != 0) {
      rawParams.forEach(param => {
        params.push(param.name)
      })
    }
    // get nested data
    return { type: "function", name: elem.id.name, isAsync: elem.async, params: params }
  }
  
  extractFunc(elem) {
    let rawParams = elem.params;
    let extract = new Code().extractFunc

    
    let params = []
    if (rawParams.length != 0) {
      rawParams.forEach(param => {
        params.push(param.name)
      })
    }
    // get nested data
    let children = []
    walk.simple(elem.body, {
      FunctionDeclaration(node) {
        children.push(extract(node));
      }
    })
    return { type: "function", name: elem.id.name, isAsync: elem.async, params: params, children: children }
  }
  getFunctionDecs(tree) {
    let body = tree.body;
    // console.log(JSON.stringify(body))
    let funcs = [];
    body.forEach(elem => {
      if (elem.type == "FunctionDeclaration") {
        funcs.push(this.extractFunc(elem))
      }
      else if (elem.type == "ExportNamedDeclaration" || elem.type == "ExportDefaultDeclaration") {
        funcs.push(this.extractFunc(elem.declaration))
      } else if (elem.type == "ClassDeclaration") {
       funcs.push(this.extractClass(elem.body.body, elem))
      }
    })
    return funcs;
    
  }
  extractClass(elem, classData) {
    let children = [];
        elem.forEach(item => {
          if (item.type == "MethodDefinition") {
            item.value.id = item.key; // because dumb
            children.push(this.extractFunc(item.value))
          }
        });
    return { type: "class", children: children, isAsync: false, params: [], name: classData.id.name }
  }
}

export default new Code()

/*
body
: 
Node2 {type: 'ClassBody', start: 10, end: 22, body: Array(1)}
end
: 
22
id
: 
Node2
end
: 
9
name
: 
"Foo"
start
: 
6
type
: 
"Identifier"
[[Prototype]]
: 
Object
start
: 
0
superClass
: 
null
type
: 
"ClassDeclaration"
[[Prototype]]
: 
Object
  */