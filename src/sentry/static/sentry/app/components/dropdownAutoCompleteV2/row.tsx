import React from 'react';
import styled from '@emotion/styled';
import {ListRowProps} from 'react-virtualized';

import space from 'app/styles/space';

import {Items, ItemSize} from './types';

type Props = {
  item: Items[0];
  itemSize: ItemSize;
  highlightedIndex: number;
  getItemProps: (props: {item: Items[0]} & Pick<ListRowProps, 'style' | 'index'>) => void;
  inputValue: string;
} & Pick<ListRowProps, 'style' | 'index'>;

const Row = ({
  item,
  style,
  itemSize,
  index,
  getItemProps,
  highlightedIndex,
  inputValue,
}: Props) =>
  item.groupLabel ? (
    <LabelWithBorder style={style}>
      {item.label && <GroupLabel>{item.label}</GroupLabel>}
    </LabelWithBorder>
  ) : (
    <AutoCompleteItem
      size={itemSize}
      highlightedIndex={highlightedIndex}
      {...getItemProps({item, index, style})}
    >
      {typeof item.label === 'function' ? item.label({inputValue}) : item.label}
    </AutoCompleteItem>
  );

export default Row;

const LabelWithBorder = styled('div')`
  background-color: ${p => p.theme.gray100};
  border-bottom: 1px solid ${p => p.theme.borderLight};
  border-width: 1px 0;
  color: ${p => p.theme.gray600};
  font-size: ${p => p.theme.fontSizeMedium};

  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const GroupLabel = styled('div')`
  padding: ${space(0.25)} ${space(1)};
`;

const getItemPaddingForSize = (size?: ItemSize) => {
  if (size === 'small') {
    return `${space(0.5)} ${space(1)}`;
  }

  if (size === 'zero') {
    return '0';
  }

  return space(1);
};

const AutoCompleteItem = styled('div')<{size?: ItemSize}>`
  /* needed for virtualized lists that do not fill parent height */
  /* e.g. breadcrumbs (org height > project, but want same fixed height for both) */
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 0.9em;
  background-color: transparent;
  padding: ${p => getItemPaddingForSize(p.size)};
  cursor: pointer;
  border-bottom: 1px solid ${p => p.theme.borderLight};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${p => p.theme.gray100};
  }
`;
