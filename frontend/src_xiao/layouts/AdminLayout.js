import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import '../css/App.css'

function AdminLayout() {
    return <div className="pageBody" >
        <Container>
            <Outlet />
        </Container>
    </div>
}
export default AdminLayout;