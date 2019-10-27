import validator from 'validator';

class FormValidator{
  constructor(validationRules){
    this.validationRules = validationRules
  }
  validate(state){
    const validation = this.makeValidResult();

    this.validationRules.forEach(rule => {
      if(!validation[rule.field].isInvalid){
      const field_value = state[rule.field].toString();
      const args = rule.args || [];
      const validation_method = 
        typeof rule.method === 'string'? 
        validator[rule.method] :
        rule.method 

      if(validation_method(field_value, ...args, state) !== rule.validWhen){
          validation[rule.field] = { isInvalid : true, message : rule.message};
          validation.isValid = false
        }
      }
    })
    return validation;
  }

  makeValidResult(){
    const validation = {};
    this.validationRules.forEach( rule => {
      validation[rule.field] = { isInvalid : false, message: '' }
    });
    return { isValid : true , ...validation  };
  }
}

export default FormValidator;