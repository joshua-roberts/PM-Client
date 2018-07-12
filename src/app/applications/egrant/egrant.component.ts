import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-egrant',
    templateUrl: './egrant.component.html',
    styleUrls: ['./egrant.component.scss']
})
export class EgrantComponent implements OnInit {
    selectedEmail = -1;
    emails = [
        {
            'title': 'Fixed the internet',
            'content': 'took out the lag. the world applauds'
        },
        {
            'title': 'Lunch?',
            'content': 'hows life, i sit near you, and you look hungry. you should eat food. with me, preferably.'
        },
        {
            'title': 'New Song',
            'content': 'Check out this new song I made.'
        },
        {
            'title': 'Fixed the internet',
            'content': 'took out the lag. the world applauds'
        },
        {
            'title': 'Lunch?',
            'content': 'hows life, i sit near you, and you look hungry. you should eat food. with me, preferably.'
        },
        {
            'title': 'New Song',
            'content': 'Check out this new song I made.'
        },
        {
            'title': 'Fixed the internet',
            'content': 'took out the lag. the world applauds'
        },
        {
            'title': 'Lunch?',
            'content': 'hows life, i sit near you, and you look hungry. you should eat food. with me, preferably.'
        },
        {
            'title': 'New Song',
            'content': 'Check out this new song I made.'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

    onEmailClick (index) {
        if (index === this.selectedEmail) {
            this.selectedEmail = -1;
        } else {
            this.selectedEmail = index;
        }
    }

    newEmail() {
        alert('new email');
    }

    sendMessage () {
        $('#newEmailModal').modal('toggle');
        alert('message sent');
    }

    draftMessage () {
        $('#newEmailModal').modal('toggle');
        alert('message drafted');
    }

    confirmAttachments () {
        $('#attachModal').modal('toggle');
        alert('attachments added');
    }

    // onDocClick(name) {
    //     const selection: string = name[1].srcElement.innerText.split('\n')[0];
    //     this.pos.forEach((ele) => {
    //         let tit: string = ele.title;
    //         if (tit.trim() === selection.trim()) {
    //             this.selectedDoc = ele;
    //         }
    //     });
    // }
}
