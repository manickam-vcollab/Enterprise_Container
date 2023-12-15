import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchBox from '../../../shared/searchBox';
import Body from '../components/sections/Body';
import Footer from '../shared/Footer';
import Back from '../shared/BackIcon';
import Add from '../shared/Add';
import Select from '../shared/SelectModel';
import { addUserFieldState, FieldType, removeUserSection, selectSections, Source } from '../../../../store/sideBar/fieldSlice';
import FieldEdit from './FieldEdit'
import { useState, useEffect } from 'react';

function Variable() {
    const dispatch = useAppDispatch();
    const [isEdit,setIsEdit] = useState(false);
    const sections = useAppSelector(selectSections)
    const selected = Object.values(sections).filter(item => item.state.selected === true);

    useEffect(() => {
        return () => {
            setIsEdit(false)
        }
    },[])
    //header
    const onClickBackIcon = () => {
        dispatch(goBack())
    }
    const getHeaderLeftIcon= () => {
        return (
        <Back onClick={() => onClickBackIcon()}/>
        );
    }
    const handleAdd = () => {
        dispatch(addUserFieldState({fieldType:FieldType.Section}))
    }
    const getHeaderRightIcon= () => {
        return (
        <Add onClick={() => handleAdd()}/>
        )
    }

    const getHeaderContent = () => {

        return (<Title text="Sections & Layers" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return <Body/>
    }

    const getFooter = () => {
        return( selected.length === 1 && selected[0].source === Source.USER ?
        <Footer onEdit={handleEdit} onDelete = {handleDelete}/> :
        null)
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleDelete = () => {
        if (selected.length === 1 && selected[0].source === Source.USER ) {
            dispatch(removeUserSection({nodeId:selected[0].id}));
        }
    }
    return (
        isEdit ?
        <FieldEdit field={sections} fieldType={FieldType.Section} back={() => setIsEdit(false)}></FieldEdit>
        :
        <SideBarContainer
            headerRightIcon = {false && getHeaderRightIcon()}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {false && getFooter()}
        />
    )
}

export default Variable
