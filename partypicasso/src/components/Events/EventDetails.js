import { Paper, Typography, Divider } from '@material-ui/core/';
import { Container, Button } from '@material-ui/core';
import useStyles from './styles';

function EventDetails() {

    const classes = useStyles();

    return (

        <Container maxWidth="lg">
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">Google Seminar</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">Seminar, Tech</Typography>
                        <Typography gutterBottom variant="body1" component="p">Welcome to google seminar in which we are going to discuss how to get in to the google company without doing anything, Because we are hiring for free whoever going to attend this seminar</Typography>
                        <Typography variant="h6">Created by: GOOGLE</Typography>
                        <Typography variant="body1">25 February 2024</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Connect</Button>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={'https://play.google.com/store/apps/dev?id=5700313618786177705&hl=en_US&gl=US'} alt="Google" />
                    </div>
                </div>
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like:
                        </Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick>
                                    <Typography gutterBottom variant="h6">Metaverse</Typography>
                                    <Typography gutterBottom variant="subtitle2">Meta</Typography>
                                    <Typography gutterBottom variant="subtitle2">If you don't like google join here</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: 1000</Typography>
                                    <img src = "https://mma.prnewswire.com/media/1673006/Meta_Logo.jpg?p=facebook" width="200px" alt='meta'/>
                                </div>
                        </div>
                    </div>
            </Paper>
        </Container>
    );
};

export default EventDetails;