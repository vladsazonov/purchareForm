import React from 'react';
import DeliveryForm from "./components/DeliveryForm";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    app: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F8FF',
    },
    formArea: {
        backgroundColor: '#fff',
        borderRadius: 24,
        width: 401,
        height: 520,
        boxShadow: ' 0 0 9px 0 rgba(0, 0, 0, 0.0784313725490196)',
    },
});


export default function App() {
    const classes = useStyles();
    return (
        <main className={classes.app}>
            <section className={classes.formArea}>
                <DeliveryForm/>
            </section>
        </main>
    )
}