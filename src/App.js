import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import DeliveryForm from "./components/DeliveryForm";
import PayForm from "./components/PayForm";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({

});


export default function App() {
    return (
        <main className="App">
            <section className="formArea">
                <DeliveryForm/>
            </section>
        </main>
    )
}