import React from 'react';

import './table.scss';
import classNames from 'classnames';

import { Text } from '../text/text';

type CellPosition = 'left' | 'center';

export type TableColumnProps<T extends object> = {
  key: keyof T;
  title: string;
  render?: (data: T) => any;
  position?: CellPosition;
  maxWidth?: number;
};

export type TableProps<T extends object> = {
  data: T[];
  columns: TableColumnProps<T>[];
};

const defaultCellPosition: CellPosition = 'center';

export const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <table className="hg-table">
      <thead className="hg-table__head">
        <tr className="hg-table__row">
          {columns.map((value) => (
            <th
              key={value.key.toString()}
              className={classNames('hg-table__cell  hg-table__cell--head', {
                [`hg-table__cell--${value.position}`]:
                  value.position !== defaultCellPosition
              })}
              style={{ maxWidth: `${value.maxWidth}px` }}
            >
              <Text level={4} color="gray-2">
                {value.title}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="hg-table__body">
        {data.map((row, index) => (
          <tr key={index} className="hg-table__row">
            {columns.map((column) => {
              return (
                <td
                  key={column.key.toString()}
                  className={classNames('hg-table__cell', {
                    [`hg-table__cell--${column.position}`]:
                      column.position !== defaultCellPosition
                  })}
                  style={{ maxWidth: `${column.maxWidth}px` }}
                >
                  {column.render ? (
                    column.render(row)
                  ) : (
                    // eslint-disable-next-line
                    // @ts-ignore
                    <Text level={4}>{row[column.key]}</Text>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
