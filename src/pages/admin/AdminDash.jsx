import React from "react";
import { Header } from "../../components/Header/Header";
import AdminCreate from '../../components/AdminCreate/AdminCreate'

export function AdminDash() {

    return (
        <>
            <Header number='4' />
            <AdminCreate/>
        </>
    )
}