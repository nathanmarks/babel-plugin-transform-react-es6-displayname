module.exports = babelPluginTransformReactEs6ClassDisplayName;

function babelPluginTransformReactEs6ClassDisplayName (babel) {
  return {
    visitor: {
      ClassDeclaration: function (path) {
        addDisplayName.call(path, babel.types);
      }
    }
  };
}

function addDisplayName (t) {
  if (
    this.node.superClass.name === 'Component' ||
    this.node.superClass.property.name === 'Component'
  ) {
    this.insertAfter([
      t.expressionStatement(t.assignmentExpression(
        '=',
        t.memberExpression(this.node.id, t.identifier('displayName')),
        t.stringLiteral(this.node.id.name)
      ))
    ]);
  }
}
