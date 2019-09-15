/* #region  Imports */
import * as React from "react";
// import axios from "axios";
import "antd/dist/antd.css";
// import "../post.css";
import { Button, Modal, Form, Input } from "antd";
import { FormComponentProps } from 'antd/es/form';

// const ReactDOM = require('react-dom')
const ReactMarkdown = require('react-markdown')
// const { Text } = Typography;
const { TextArea } = Input;
/* #endregion */

/* #region Form */
interface iMakePostProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onCreate: any;
};

const PostCreateForm = Form.create<iMakePostProps>({ name: "form_in_modal" })(
    // eslint-disable-next-line
    class extends React.Component<iMakePostProps, iState> {

        onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            this.setState({ userComment: e.target.value });
        };

        sendForm = () => {
            this.props.onCreate();
            this.setState({ userComment: "" });
        }

        render() {
            const { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    visible={visible}
                    title="Add information"
                    okText="Post"
                    onCancel={onCancel}
                    onOk={this.sendForm}
                    width="80%"
                >
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%" }}>
                            <Form layout="vertical">
                                <Form.Item label="Comment">
                                    {getFieldDecorator("comment", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "You cannot post an empty comment!"
                                            }
                                        ]
                                    })(
                                        <TextArea
                                            placeholder="Please add your thoughts.."
                                            autosize={{ minRows: 20, maxRows: 35 }}
                                            onChange={this.onChange}
                                        />
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="ant-comment-content-detail" style={{ width: "50%" }}>

                            {this.state ? (<ReactMarkdown source={this.state.userComment} />) : (<ReactMarkdown source=" " />)}

                        </div>
                    </div>
                </Modal>
            );
        }
    }
);
/* #endregion */

/* #region  Class component */

interface iUserFormProps {
    nodeID: string;
};

interface iState {
    formVisible: boolean;
    userComment: string | null;
};

export default class MakePost extends React.Component<iUserFormProps, iState> {
    constructor(props: iUserFormProps) {
        super(props);
        this.state = {
            formVisible: false,
            userComment: null
        }
    }
    formRef: any;

    componentDidMount() {
        this.setState({ formVisible: false, userComment: " " });
    }


    showModal = () => {
        this.setState({ formVisible: true });
    };

    handleCancel = () => {
        this.setState({ formVisible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err: any, values: any) => {
            if (err) {
                return;
            }
        });

        // const userComment = this.formRef.state.userComment;

        // const newPost = {
        //     node: this.props.nodeID,
        //     user: "5d69e751a4ed4c6064f620fd",
        //     contents: userComment,
        //     date: Date.now
        // };

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // };

        try {
            // const res = axios.post("/api/postings", newPost, config);// why need const res?
            // axios.post("/api/postings", newPost, config);
            console.log("CHRIS: Data is sent to the database, commented out until DB access is granted");

        } catch (err) {
            console.log(err);
        }

        form.resetFields();

        this.setState({ formVisible: false, userComment: "" });
    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create Post
                </Button>
                <PostCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.formVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

/* #endregion */













