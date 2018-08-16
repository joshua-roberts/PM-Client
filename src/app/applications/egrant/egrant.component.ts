import { Component, OnInit } from '@angular/core';
import {PmService} from '../../services/pm.service';

@Component({
    selector: 'app-egrant',
    templateUrl: './egrant.component.html',
    styleUrls: ['./egrant.component.scss']
})
export class EgrantComponent implements OnInit {
    tempAttachments = [];
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

    constructor(private pm: PmService) { }

    ngOnInit() {
        this.pm.getEmails('inbox').then((data) => {
            console.log(data);
        });
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

    // private int emailNodeId;
    // private String emailBody;
    // private String emailSubject;
    // private String recipient;
    // private String sender;
    // private Timestamp timestamp;
    // private List<Integer> attachments;
    sendMessage (sender, recipient, subject, body) {
        const time = new Date();
        this.pm.sendEmail(null, body, subject, recipient, sender, time.getMilliseconds(), [])
        $('#newEmailModal').modal('toggle');
        alert('message sent');
    }

    draftMessage () {
        $('#newEmailModal').modal('toggle');
        alert('message drafted');
    }

    onDocAttach (doc) {
        if (doc.type !== 'PC' && doc.type !== 'C') {
            this.tempAttachments.push(doc);
        }
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
