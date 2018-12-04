import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
// import Checkbox from './Checkbox';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import options from './options';
import { Debug } from './Debug';

class FormikCheckboxes extends React.Component {

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <h1>A checkbox tree with the option to select all checkboxes</h1>
                <Formik
                initialValues={{selectAll: false, carOptions: []}}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    }, 1000);
                }}
                render={(props) => {
                    const { values } = props;
                    let checkedCarOptions = options.length === Object.keys(values.carOptions).length;

                    return (
                        <div>
                            <Field 
                                component={Checkbox} 
                                name="selectAll" 
                                value="selectAll" 
                                checked={checkedCarOptions}
                                onChange={
                                    (event) => { 
                                        props.setFieldValue("selectAll", event.target.checked);
                                        const optionsList = options.map(option => option.id);
                                        event.target.checked ? props.setFieldValue("carOptions", optionsList) : props.setFieldValue("carOptions", []);
                                    }
                                }
                            />{"Select the whole trilogy"}
                            <FieldArray
                                name="carOptions" 
                                render={ arrayHelpers => {
                                    return (
                                        <div className={classes.checkBoxesList}>
                                            {options.map( option => (
                                                <div key={option.id}>
                                                    <label>
                                                    <Checkbox
                                                        name="carOptions"
                                                        type="checkbox"
                                                        value={option.id}
                                                        checked={props.values.carOptions.includes(option.id)}
                                                        onChange={e => {
                                                            if (e.target.checked) { 
                                                                arrayHelpers.push(option.id); 
                                                            } else {
                                                                const idx = props.values.carOptions.indexOf(option.id);
                                                                arrayHelpers.remove(idx);
                                                            }
                                                        }}
                                                    />{option.name}
                                                    
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                    
                                }} 
                            />
                            <Debug />
                        </div> 
                    )
                }}
                />
            </div>
        )
    }
}
    

export default withStyles(styles)(FormikCheckboxes);