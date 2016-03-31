module.exports = babelTransformReactEs6ClassDisplayName;

function babelTransformReactEs6ClassDisplayName ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration (path) {
        addDisplayName.call(path, t);
      }
    }
  };
}

function addDisplayName (t) {
  if (this.node.superClass.property.name === 'Component') {
    this.insertAfter([
      t.expressionStatement(t.assignmentExpression(
        '=',
        t.memberExpression(this.node.id, t.identifier('displayName')),
        t.stringLiteral(this.node.id.name)
      ))
    ]);
  }
}
