exports.validate = (rules, data) => {
    return new Promise( (resolve,reject) => {
        const errors = {};
        Object.getOwnPropertyNames(rules).forEach((rule_key, rule_idx) => {

            const ruleNeeded = rules[rule_key].split('|'); // required min max etc
                
            ruleNeeded.forEach((fn) => {

                const needed = fn.split(':');
                
                if(needed.length > 1) {
                    const status = fnValidate[needed[0]](rule_key, needed[1], data)
                    
                    if(!status.valid) {
                        if (!errors[rule_key]) {
                            errors[rule_key] = [];
                        }
                        errors[rule_key].push(status.message);
                    }

                } else {
                    const status = fnValidate[needed[0]](rule_key, data);
                    
                    if(!status.valid) {
                        if (!errors[rule_key]) {
                            errors[rule_key] = [];
                        }
                        errors[rule_key].push(status.message);
                    }
                    
                }
                

            });

        });
        
        if (Object.getOwnPropertyNames(errors).length > 0) {
            reject(errors);
        } else {
            resolve(errors);
        }

    });
}
const fnValidate = {
    required: function required(fieldName, data) {
        const status = {
            valid: true,
            message: ''
        };
        if (data[fieldName] === '' || data[fieldName] === null || data[fieldName] === undefined) {
            status.valid = false;
            status.message = `${fieldName} tidak boleh kosong`;
        }
        return status;
    },
    
    max: function max(fieldName, maxValue, data) {
    
        const status = {
            valid: true,
            message: ''
        };

        if(data[fieldName]) {
            if (data[fieldName].length > parseInt(maxValue) ) {
                status.valid = false;
                status.message = `${fieldName} tidak boleh lebih besar dari ${maxValue}`;
            }
        }
    
        return status;
    },
    min: function max(fieldName, minValue, value) {
        
        const status = {
            valid: true,
            message: ''
        };
        if(data[fieldName]) {
            if (data[fieldName].length < parseInt(minValue)) {
                status.valid = false;
                status.message = `${fieldName} tidak boleh kurang dari ${minValue}`;
            }
        }

        return status;
    }
};