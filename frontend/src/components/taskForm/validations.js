const lettersOrSpacesREGEX = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
export function validate(form, tasks, editing) {
    let errors = {};

    let existingTask =
        tasks &&
        form.title &&
        tasks.find(
            (task) => task.title.toLowerCase() === form.title.toLowerCase()
        );

    if (existingTask && !editing) {
        errors.title = "Title already exists";
    }

    if (!form.title.trim()) {
        errors.title = "Task's title can't be empty";
    }

    if (form.title.length > 15) {
        errors.title = "Task's title can't be more than 15 characters";
    }
    if (!lettersOrSpacesREGEX.test(form.title.trim()) && form.title) {
        errors.title = 'Just "," , "." , letters and blank spaces';
    }
    /************************************************************************************ */

    if (form.description.length > 100) {
        errors.description = "description can't be more than 100 characters";
    }

    return errors;
}
