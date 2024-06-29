import React, { FC } from 'react'
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, Slide, Typography } from '@mui/material';
import { AbilityResponse } from '@/models/abilities/abilityResponse';
import MultipleIntelligencesRender from './MultipleIntelligencesRender';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    ability: AbilityResponse | null
    open: boolean;
    handleClose: () => void;
}

const AbilityInfoDialog: FC<Props> = ({ handleClose, open, ability }) => {
    console.log(ability)
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"ความสามารถของนักเรียน"}</DialogTitle>
            <DialogContent className='w-96' >
                <List disablePadding>
                    <ListItem>
                        <ListItemText
                            primary={"ชื่อนักเรียน"}
                            secondary={ability?.student?.title + " " + ability?.student?.firstName + " " + ability?.student?.lastName}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"ชื่อโรงเรียน"}
                            secondary={ability?.student.school.schoolNameTh}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"ความสามารถ"}
                            secondary={ability ? <MultipleIntelligencesRender size='small' multipleIntelligences={ability.multipleIntelligences} /> : ""}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"หมายเหตุ"}
                            secondary={ability?.reasonNote ? ability?.reasonNote : "-"}
                        />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ตกลง</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AbilityInfoDialog