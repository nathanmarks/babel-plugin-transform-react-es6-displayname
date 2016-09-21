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
    this.node.superClass &&
    (
      this.node.superClass.name === 'Component' ||
      (
        this.node.superClass.object &&
        this.node.superClass.object.name === 'React' &&
        this.node.superClass.property.name === 'Component'
      )
    )
  ) {
    (t.isExportNamedDeclaration(this.parentPath.node) ? this.parentPath : this).insertAfter([
      t.expressionStatement(t.assignmentExpression(
        '=',
        t.memberExpression(this.node.id, t.identifier('displayName')),
        t.stringLiteral(this.node.id.name)
      ))
    ]);
  }
}
