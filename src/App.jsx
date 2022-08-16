import './App.css';
import 'antd/dist/antd.css';
import { Col, Row, Layout, Button, Divider } from 'antd';
import { useEffect, useState, useRef } from 'react';
import CardBlock from './components/CardBlock';
import AddBlock from './components/AddBlock';

const { Header, Content, Footer } = Layout;
const limit = 24;
const maxPages = Math.ceil(100 / limit);

function App() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editPost, setEditPost] = useState(0);
    const inputRef = useRef(null);

    const patchPost = (id) => {
        let value = inputRef.current.resizableTextArea.props.value;
        setIsUpdating(true);
        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            body: value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        if (json) {
            setIsUpdating(false);
            handleSave(id, value);
            setEditPost(0);
        } 
        });
    }

    const addPost = (values) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: values.title,
                body: values.text,
                userId: values.username,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                handleNewPost(json);
            });
    }

    const handleNewPost = (values) => {
        let newPosts = [...posts];
        newPosts.unshift({
            userId: values.userId,
            id: Math.random() * 1000 | 100,
            title: values.title,
            body: values.body,
        });
        setPosts(newPosts);
    }

    const fetchPosts = () => {
        setIsLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts?_page=' + currentPage + '&_limit=' + limit)
        .then(res => res.json())
        .then(res => {
            setPosts([...posts, ...res]);
            setIsLoading(false);
        });
    }

    const deletePost = async(id) => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE',
        });
        handleDelete(id);
    }

    const handleEdit = (id) => {
        setEditPost(id);
    }

    const handleDelete = (id) => {
        let newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
    }

    const handleSave = (id, value) => {
        let newPosts = posts.map((post) => {
        if (post.id === id) {
            post.body = value;
            return post;
        } else {
            return post;
        }
        });
        setPosts(newPosts);
    }

    const loadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    return (
        <div className="App">
            <Layout>
                <Header style={styles.header}>
                    <p style={styles.headerText}>Dummy posts</p>
                </Header>
                <Content className="site-layout" style={styles.content}>
                    <AddBlock addPost={addPost} />
                    <Divider />
                    <Row gutter={[16, 16]}>
                        {posts.length && posts.map((post) => (
                            <CardBlock
                                key={post.id}
                                post={post}
                                deletePost={deletePost}
                                patchPost={patchPost}
                                handleEdit={handleEdit}
                                editPost={editPost}
                                isUpdating={isUpdating}
                                forwardedRef={inputRef}
                            />
                        ))}
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={8} offset={8}>
                            <Button
                                disabled={currentPage===maxPages}
                                size={'large'}
                                block
                                type='primary'
                                onClick={loadMore}
                                loading={isLoading}
                            >
                                Load more
                            </Button>
                        </Col>
                    </Row>
                </Content>
                <Footer style={styles.footer}>Dummy posts ©2022</Footer>
            </Layout>
        </div>
    );
}

const styles = {
    header: {
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        textAlign: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 32
    },
    content: {
        margin: '84px auto 0',
        width: '1280px',
        minHeight: 'calc(100vh - 134px)',
    },
    footer: {
        textAlign: 'center',
    }
}

export default App