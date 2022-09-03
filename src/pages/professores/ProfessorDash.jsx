import React from "react";
import { Header } from "../../components/Header/Header";
import  ProfessorCreate  from '../../components/ProfessorCreate/ProfessorCreate'
 
export function ProfessorDash() {
    return (
        <>
            <Header number = '3'/>
            <ProfessorCreate/>
        </>
    )
}