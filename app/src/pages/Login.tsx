import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC<any> = () => {
    return (<> 
        <div><Link to="/">ルート</Link></div>
        <div><Link to="/login">ログイン</Link></div>
        <div><Link to="/register">アカウント作成</Link></div>
        <div><Link to="/management">管理</Link></div>
    </>)
}

export default Login