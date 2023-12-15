import {
  List,
  Group,
  ActionIcon,
} from '@mantine/core'
import { HandClick, Check } from 'tabler-icons-react';

import { useAppSelector } from 'store/storeHooks';
import { selectNextActionIndex } from 'store/tourSlice';
import { DescriptionComponent, StepContent } from './Types'

import { makeStyles } from '@material-ui/styles';

export const StepComponent = (props: StepContent) => {

  const nextActionIndex = useAppSelector(selectNextActionIndex);

  const useStyles = makeStyles((theme: any) => {
    return {
      text: {
        color: theme.palette.text.secondary,
        textAlign: 'justify'
      }
    }
  });
  const classes = useStyles();

  return (
    <div style={{ width: 340, margin: 'auto' }} >
      <Group position='apart'>
        <div style={{ textAlign: 'justify', fontSize: '14px', fontWeight: 400 }} >
          {props.description}
        </div>
        <List
          spacing='xs'
          size='sm'
          style={{
            textAlign: 'justify'
          }}
        >
          {props.actionItems?.map((item: DescriptionComponent, index: number) => (
            <List.Item key={index}
              icon={
                <ActionIcon variant='transparent'>{
                  index < nextActionIndex
                    ? <Check className={classes.text} size={14} />
                    : <HandClick color='#0078d4' size={14} />
                }
                </ActionIcon>
              }
            >
              <div className={classes.text}>
                {item}
              </div>
            </List.Item>
          ))}
        </List>
      </Group>
    </div>
  );
}

export default StepComponent
