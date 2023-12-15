import { useCallback } from 'react';
import {useAppSelector, useAppDispatch} from '../../../../../../store/storeHooks'
import {selectLabelData, editLabel} from '../../../../../../store/sideBar/labelSlice/AllLabelSlice'
import {
    ReactExtensions,
    useHelpers,
    useCommands,
    useKeymap,
    useActive
  } from '@remirror/react';
import {ILabel,LabelType} from '../../../../../../store/sideBar/labelSlice/shared/types';
import { BoldExtension, ItalicExtension, UnderlineExtension, NodeFormattingExtension, wysiwygPreset } from 'remirror/extensions';
import {defaultData} from '../../../../../../store/appDefaultSlice';
export type Extensions = ReactExtensions<BoldExtension & 
ItalicExtension & 
UnderlineExtension & 
NodeFormattingExtension>;
export const extensions = () => [
    new NodeFormattingExtension(),
    ...wysiwygPreset()];

export const hooks = [
  () => {
    const { getJSON, getHTML } = useHelpers();
    const labels2d = useAppSelector(selectLabelData);
    const dispatch = useAppDispatch();
    const handleSaveShortcut = useCallback(
      ({ state }) => {
        Object.values(labels2d).forEach(l => {
          dispatch(editLabel({id: l.id,value: JSON.stringify(getJSON(state))}));
        }) 
        // console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

export const Label2DTemplate = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
            nodeIndent: 0,
            nodeTextAlignment: "left"
          },
        content: [
          {
            type: 'text',
            text: defaultData.labels.label2d,
          },
        ],
      },
    ],
  };
export const Label3DTemplate = {
    type: 'doc',
    content: [
        {
        type: 'paragraph',
        attrs: { dir: null, ignoreBidiAutoUpdate: null },
        content: [
            {
            type: 'text',
            text: defaultData.labels.probeLabel,
            },
        ],
        },
    ],
  };

export const getInitialContent = (selectedLabels:ILabel[]) => {
  if(selectedLabels.length > 1) {
    switch(selectedLabels[0].labelType) {
      case LabelType.LABEL2D:
      return  {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: { dir: null, ignoreBidiAutoUpdate: null },
              content: [
                {
                  type: 'text',
                  text: `Cannot edit Multiple 2d labels selected`
                },
              ],
            },
          ]
      }
    
      default:
        return JSON.parse(selectedLabels[0].label)
    }
  }
  else{
    return JSON.parse(selectedLabels[0].label)
  }
}