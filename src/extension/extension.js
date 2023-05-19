const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.touchAtime', function (context, items) {
		items.filter(function(item){ return item.scheme == "file" })
			.forEach(function(item){		
				let st = fs.statSync(item.path)	 
				fs.promises.utimes(item.path, new Date(), st.mtime);
			});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
