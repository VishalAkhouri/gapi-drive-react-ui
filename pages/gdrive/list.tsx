import { useState, useEffect } from 'react';
import Router from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Label from '@material-ui/icons/Label';
import FolderIcon from '@material-ui/icons/Folder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { isAuth2SignedIn, listFiles } from '../../src/utils/gapi';
import { useGDriveListStyles, useTreeItemStyles } from '../../src/styles/gdrive/styles';
import Copyright from '../common/copyright';
import { IFileList } from '../../src/models/file-list';
import { GapiMimeType } from '../../src/enums/gapi-mime-type';
import ButtonAppBar from '../common/header';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [filesList, setFilesList] = useState<IFileList[]>([])

    useEffect(() => {
        if (loading) {
            if (gapi && gapi.auth2) {
                const isUserSignedIn = isAuth2SignedIn();
                setIsSignedIn(isUserSignedIn)

                if (isUserSignedIn) {
                    listFiles().then(response => {
                        var files = response.result.files;
                        if (files && files.length > 0) {
                            setFilesList(files)
                        }
                        setLoading(false);
                    });
                }
            } else {
                Router.push('/');
            }
        }
    }), [loading];

    return (
        <div className={classes.root}>
            <ButtonAppBar isSignedIn={isSignedIn}></ButtonAppBar>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    Your google drive view
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Total files/folders shown: {filesList?.length}
                </Typography>
                <Typography variant="body1">
                    {filesList.length > 0 &&
                        <TreeView
                            className={classes.root}
                            defaultExpanded={['3']}
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            defaultEndIcon={<div style={{ width: 24 }} />}
                        >
                            <StyledTreeItem nodeId="3" labelText="Files/Folders" labelIcon={Label}>
                                {filesList.map((fileData: IFileList, index) => (
                                    <StyledTreeItem
                                        nodeId={'id_'+index}
                                        labelText={fileData.name}
                                        labelIcon={fileData.mimeType === GapiMimeType.GDriveFolder ? FolderIcon : FileCopyIcon}
                                        color="#e3742f"
                                        bgColor="#fcefe3" />
                                ))}
                            </StyledTreeItem>
                        </TreeView>
                    }
                    {filesList.length <= 0 && <div>No Files to display.</div>}
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
