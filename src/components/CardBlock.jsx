import { Card, Col, Input } from 'antd';
import { EditOutlined, SaveOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const CardBlock = (props) => {
    const renderText = (value, id) => {
        if (id === props.editPost) {
            return <TextArea ref={props.forwardedRef} defaultValue={value} autoSize style={styles.textArea} showCount maxLength={300} />
        }
        return <p>{value}</p>
    }

    const renderControls = (id) => {
        if (id === props.editPost) {
            if (!props.isUpdating) {
                return <SaveOutlined key={'save'} onClick={() => props.patchPost(id)} />
            } else {
                return <LoadingOutlined key={'loading'} />
            }
        }
        return <EditOutlined key={'edit'} onClick={() => props.handleEdit(id)} />
    }
    
    return (
        <Col span={6} style={styles.col}>
            <Card
                style={styles.card}
                title={props.post.title}
                headStyle={styles.cardHead}
                actions={[
                    renderControls(props.post.id),
                    <DeleteOutlined key={'delete'} onClick={() => props.deletePost(props.post.id)} />
                ]}
            >
                {renderText(props.post.body, props.post.id)}
            </Card>
        </Col>
    );
}

const styles = {
    textArea: {
         minWidth: '100%',
    },
    col: {
        display: 'flex',
    },
    card: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'max-content 1fr max-content',
        width: '100%',
    },
    cardHead: {
        fontSize: 18,
    }
}

export default CardBlock;