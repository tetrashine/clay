import Base from 'displays/abstract/base';

class SvgTable extends Base {

  generate(doc: any, header: Array<string | number> = [], rows: Array<Array<string | number>> = []) {
    const inner = `<table xmlns="http://www.w3.org/2000/svg" class="paper tb">
      <thead class="tb-hd"><tr class="tb-rw">${['', ...header].map(_ => `<th class="tb-cell-hd">${_}</th>`).join('')}</tr></thead>
      <tbody class="tb-bd">${
        rows.map((cols: Array<string | number>, rowIndex: number): string => {
          return Array.isArray(cols) 
            ? `<tr class="tb-rw"><td class="tb-cell">${rowIndex + 1}.</td>${cols.map((_) => `<td class="tb-cell">${_}</td>`).join('')}</tr>`
            : `<tr class="tb-rw"><td class="tb-cell">${rowIndex + 1}.</td><td class="tb-cell">${cols}</td></tr>`;
        }).join('')
      }</tbody>
    </table>`;

    const fo = this.createDomElement(doc, 'foreignObject', inner);
    fo.setAttribute('width', String(420));
    fo.setAttribute('height', String(70 + rows.length * 40));

    return fo;
  }
}

export default new SvgTable();