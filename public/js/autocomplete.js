myCodeMirror.on("keyup", (cm, event) => {
    const excludedKeys = [8, 9, 13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 186, 219, 221];
    if (!cm.state.completionActive && !excludedKeys.includes(event.keyCode)) {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
})