import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/Photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); //getting user from observable
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) { //event of type "any"
    this.hasBaseDropzoneOver = e; 
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user); //it will update our current user observable and current user in local storage
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true; //setting photo as main
      })
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId); //returns array all of the photos that are not equal photoId we passing in method deletePhoto
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token, //token to authorize
      isHTML5: true,
      allowedFileType: ['image'], //allows only images
      removeAfterUpload: true, //Delete from dropzone after adding
      autoUpload: false, //user must click button
      maxFileSize: 10 * 1024 * 1024 //maximum size of file for free cloudinary account
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; //we dont need this becouse we using Baerer token
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => { //what we want to do after succesfull upload
      if (response) {
        const photo = JSON.parse(response); //converting response to JSON
        this.member.photos.push(photo); //adding photo to member photos array
      }
    }
  }

}
