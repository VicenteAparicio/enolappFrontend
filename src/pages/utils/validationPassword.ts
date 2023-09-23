export const validationPassword = (pass: string): string[] => {
    const comboIssues: string[] = [''];

    if (pass.length < 12) {
        const quantityChar = 12 - pass.length;
        comboIssues.push(
            `${quantityChar} letters missing.`
        );
    }

    const upperRG = new RegExp(/[A-Z]/);
    const lowerRG = new RegExp(/(?![@$!%*#?&])[a-z]/);
    const numberRG = new RegExp(/\d/);
    const specialRG = new RegExp(/[@$!%*#?&]/);

    if (!upperRG.test(pass)) {
        comboIssues.push('Uppercase missing.');
    }
    if (!lowerRG.test(pass)) {
        comboIssues.push('Lowercase missing.');
    }
    if (!numberRG.test(pass)) {
        comboIssues.push('Number missing.');
    }
    if (!specialRG.test(pass)) {
        comboIssues.push('Special character missing.');
    }

    return comboIssues;
};