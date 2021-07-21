myCodeMirror.on("keyup", (cm, event) => {
    if (!cm.state.completionActive && event.keyCode != 13) {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
});