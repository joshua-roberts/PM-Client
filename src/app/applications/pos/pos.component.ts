import {Component, OnInit} from '@angular/core';
import * as data from './pos.json';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {
    pos;
    selectedDoc;

    constructor() {
    }

    ngOnInit() {
        this.pos = this.convertData(data);
        this.selectedDoc = this.pos[0];
    }

    convertData(d) {
        let nodes = [], links = [];
        d.results[0].data.forEach(function (row) {
            row.graph.nodes.forEach(function (n) {
                if (!nodes[n.id]) {
                    nodes[n.id] = {id: n.id, propertyId: n.properties.id, label: n.labels[0], title: n.properties.name, children: null};
                }
            });
            links = links.concat(row.graph.relationships.map(function (r) {
                return {start: r.startNode, end: r.endNode, type: r.type};
            }));
        });

        nodes.forEach(function (n) {
            let childs = [];
            links.forEach(function (d) {
                if (d.start === n.id) {
                    if (nodes[d.end]) {
                        childs.push(nodes[d.end]);
                    }
                }
            });
            n.children = childs;
        });

        return nodes;
    }

    addFolder () {
        this.pos[0].children.push({
            id: 800,
            propertyId: 99,
            label: 'oa',
            title: 'test folder',
            children: []
        });
        console.log(this.pos);
    }

    addDocument () {
        this.pos[0].children.push({
            id: 799,
            propertyId: 98,
            label: 'o',
            title: 'test doc',
            children: []
        });
        console.log(this.pos);
    }

    onDocClick(name) {
        const selection: string = name[1].srcElement.innerText.split('\n')[0];
        this.pos.forEach((ele) => {
            const tit: string = ele.title;
            if (tit.trim() === selection.trim()) {
                this.selectedDoc = ele;
            }
        });
    }
}
