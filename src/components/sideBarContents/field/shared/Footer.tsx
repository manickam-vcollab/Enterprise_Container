import React from 'react'
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

type FooterProps = {
    onEdit : () => void,
    onDelete: () => void
}
function Footer(props:FooterProps) {
    return (
        <OptionContainer>
            <Option label="Edit" icon={EditIcon} onClickUpdate={props.onEdit}
             />
            <Option label="Delete" icon={DeleteIcon} onClickUpdate={props.onDelete}
            />
        </OptionContainer>
    )
}

export default Footer
