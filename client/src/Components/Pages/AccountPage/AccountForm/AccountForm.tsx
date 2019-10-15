import * as React from "react";
import { Row, Col, Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from 'axios';
import { isNullOrUndefined } from "util";

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

// export interface iState {
//     user: iAccount;
// }

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

        if (account !== null) {

            console.log("account !== null");
            console.log(account);
        } else {
            //clear form
            setAccount({
                username: Props.username,
                firstname: ' ',
                lastname: ' ',
                email: ' ',
                position: ' ',
                phone: ' ',
            });
        }
        //Dependencies below, only run if these change
    }, []);


    const findAccount = (username: string) => {
        let data: any = { query: "query{accountForUser(username: \"" + username + "\"){ id username firstname lastname email position phone}} \n\n" };
        axios.post("http://localhost:3000/graphql/", data).then(res => {
            const usersAccount: iAccount = res.data.data.accountForUser;
            setAccount(usersAccount);
            console.log("The axios return: ", usersAccount);
            
        })
    }
   

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        console.log("handleSubmit function");
        console.log("account state");
        console.log(account);
        
        e.preventDefault();
        if (account.username == null || isNullOrUndefined(account.username)) {
            setAccount({ ...account, username: Props.username });
            addAccount(account);
        }else{
            updateAccount(account);
            console.log("handleSubmit function else");
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
                mutation AddAccount($username: string, $firstname: string, $lastname: string, $email: string, $position: string, $phone: string){
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
                mutation UpdateAccount($username: string, $firstname: string, $lastname: string, $email: string, $position: string, $phone: string){
                    updateAccount(username: $username, firstname: $firstname, lastname: $lastname, email: $email, position: $position, phone: $phone){
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
                    username: account.username,
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
        //onSubmit={handleSubmit}
        <form  className="login-form">
            <Row className="myRow">
                <Col span={6}>
                    <p>First Name:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="First Name" value={account.firstname} size="large" name="firstname" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="myRow">
                <Col span={6}>
                    <p>Last Name:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Last Name" value={account.lastname} size="large" name="lastname" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="myRow">
                <Col span={6}>
                    <p>Email Address:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Email Address" value={account.email} size="large" name="email" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="myRow">
                <Col span={6}>
                    <p>Job Title:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Position in organisation" value={account.position} size="large" name="position" onChange={handleChange} />
                </Col>
            </Row>
            <Row className="myRow">
                <Col span={6}>
                    <p>Phone Number:</p>
                </Col>
                <Col span={10}>
                    <Input placeholder="Phone Number" size="large" value={account.phone} name="phone" onChange={handleChange} />
                </Col>
            </Row>
            <Row type="flex" justify="end" className="myRow">
                <Col span={6}></Col>
                <Col span={10}>
                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </form>
    );

}
export default AccountForm