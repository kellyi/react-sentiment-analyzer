import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';

const headerStyles = Object.freeze({
    linkStyles: Object.freeze({
        textDecoration: 'none',
        color: '#fff',
    }),
});

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <a
                        href="http://example.com"
                        style={headerStyles.linkStyles}
                    >
                        <CodeIcon />
                    </a>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    react-sentiment-analyzer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
