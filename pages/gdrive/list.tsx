import { useState, useEffect } from 'react';
import Router from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FolderIcon from '@material-ui/icons/Folder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { isAuth2SignedIn, listFiles } from '../../src/utils/gapi';
import { useGDriveListStyles, useTreeItemStyles } from './styles';
import Copyright from '../common/copyright';
import { IFileList } from '../../src/models/file-list';

declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}
export default function GDriveList() {
    const classes = useGDriveListStyles();
    const [loading, setLoading] = useState(true)
    const [filesList, setFilesList] = useState<IFileList[]>([])

    useEffect(() => {
        if (loading) {
            if (gapi && gapi.auth2) {
                const isSignedIn = isAuth2SignedIn();

                if (isSignedIn) {
                    listFiles().then(response => {
                        var files = response.result.files;
                        if (files && files.length > 0) {
                            setFilesList(files)
                        }
                        console.log(filesList);
                        setLoading(false);
                    });
                }
            } else {
                console.log('redirect to sign in page')
                Router.push('/');
            }
        }
    }), [loading];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    Your google drive view
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Total files/folders shown: {filesList?.length}
                </Typography>
                <Typography variant="body1">
                    <TreeView
                        className={classes.root}
                        defaultExpanded={['3']}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                    >
                        <StyledTreeItem nodeId="1" labelText="Files and Folders" labelIcon={Label}>
                            <StyledTreeItem
                                nodeId={`1`}
                                labelText='My File'
                                labelIcon={FileCopyIcon}
                                labelInfo="90"
                                color="#1a73e8"
                                bgColor="#e8f0fe"
                            />
                        </StyledTreeItem>
                    </TreeView>
                </Typography>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Developed by: Akhouri Vishal Sinha</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    )
}
