import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default function FormattedInputs() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        textmask: '  /    ',
        numberformat: '1320',
    });

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
                <Input
                    style={{
                        height: 40,
                        borderRadius: 4,
                        border: '1px solid grey'
                    }}
                    value={values.textmask}
                    onChange={handleChange('textmask')}
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom}
                />
                <MaskedInput
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    placeholderChar='#'
                    placeholder="Z"
                    showMask
                    style={{
                        height: 20,
                        borderRadius: 4,
                        border: '1px solid #c4c4c4',
                        padding: '10.5px 10.5px',
                        color: '#a2a2a2',
                    }}
                    value={values.textmask}
                    onChange={handleChange('textmask')}
                    id="formatted-text-mask-input"
                />
            </FormControl>
        </div>
    );
}