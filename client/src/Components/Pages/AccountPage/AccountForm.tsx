import * as React from "react";
import { Row, Col, Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from 'axios';
import { isNullOrUndefined } from "util";

import "./AccountForm.less";

interface iAccount {
    id?: string;
    createdAt?: Date;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    position: string;
    phone: string;
}

export interface iProps {
    account?: iAccount;
    username: string;
}

const AccountForm = (Props: iProps, { }) => {

    const [account, setAccount] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        position: '',
        phone: '',
    });

    useEffect(() => {
        findAccount(Props.username);
        //TODO spinner while loading
        //Dependencies below, only run if these change
    }, []);

    const findAccount = async (userName: string) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                query UserByName($username: String) {
                    userByName(username: $username) {
                        id
                        createdAt
                        username 
                        coursesTaken
                        coursesComplete
                        history
                        accessLevel
                        account {
                          id
                          username 
                          firstname 
                          lastname 
                          email 
                          position 
                          phone
                        }
                    }
                  }`,
                variables: {
                    username: userName
                }
            }
        }).then((res) => {
            const usersAccount: iAccount = res.data.data.userByName.account;
            if(usersAccount) {
                setAccount(usersAccount);
            }
        }).catch((res) => {
            console.log("Something went wrong with finding the user account, res:", res);
        });
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (account.username == null || isNullOrUndefined(account.username)) {
            setAccount({ ...account, username: Props.username });
            addAccount(account);
        } else {
            updateAccount(account);
        }
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: any = e.target;
        setAccount({ ...account, [name]: value })
        console.log(name, value);
    }

    const addAccount = async (account: iAccount) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation AddAccount($username: String, $firstname: String, $lastname: String, $email: String, $position: String, $phone: String){
                    addAccount(username: $username, firstname: $firstname, lastname: $lastname, email: $email, position: $position, phone: $phone){
                        username 
                        firstname 
                        lastname 
                        email 
                        position
                        phone
                    }
                }`,
                variables: {
                    username: Props.username,
                    firstname: account.firstname,
                    lastname: account.lastname,
                    email: account.email,
                    position: account.position,
                    phone: account.phone
                }
            }
        }).then(() => {
            console.log("User account added");
        }).catch(() => {
            console.log("Something went wrong with adding the user account");
        });
    }

    const updateAccount = async (account: iAccount) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation UpdateAccount($id: String, $username: String, $firstname: String, $lastname: String, $email: String, $position: String, $phone: String){
                    updateAccount(id: $id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, position: $position, phone: $phone){
                        id
                        username 
                        firstname 
                        lastname 
                        email 
                        position
                        phone
                    }
                }`,
                variables: {
                    id: account.id,
                    username: Props.username,
                    firstname: account.firstname,
                    lastname: account.lastname,
                    email: account.email,
                    position: account.position,
                    phone: account.phone
                }
            }
        }).then(() => {
            console.log("User account updated");
        }).catch(() => {
            console.log("Something went wrong with updating the user account");
        });
    }

    return (
        <form className="account-form">
            <Row gutter={16} className="accountRow">
                <Col span={6}>
                    <p>First Name:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="First Name" value={account.firstname} size="large" name="firstname" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="accountRow">
                <Col span={6}>
                    <p>Last Name:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Last Name" value={account.lastname} size="large" name="lastname" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="accountRow">
                <Col span={6}>
                    <p>Email Address:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Email Address" value={account.email} size="large" name="email" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="accountRow">
                <Col span={6}>
                    <p>Job Title:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Position in organisation" value={account.position} size="large" name="position" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="accountRow">
                <Col span={6}>
                    <p>Phone Number:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Phone Number" size="large" value={account.phone} name="phone" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="accountRow">
                <Col span={16}>
                    <Button icon="form" type="primary" onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </form>
    );

}

export default AccountForm