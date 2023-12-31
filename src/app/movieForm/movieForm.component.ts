import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Movie } from '../models/Movie';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar, SnackBarOptions } from "@nstudio/nativescript-snackbar";

@Component({
	moduleId: module.id,
	selector: 'ns-movieForm',
	templateUrl: './movieForm.component.html',
	styleUrls: ['./movieForm.component.css']
})

export class MovieFormComponent implements OnInit {
	movie:any;
	movieTitle:string;

	constructor(private routerExtemtions : RouterExtensions,
		private apiService : ApiService,
		private activatedRoute : ActivatedRoute,
		private router : Router) { }

	ngOnInit() { 
	const id = this.activatedRoute.snapshot.params.id;
	if (id >= 0){
		this.getDetails(id);
	} else{
		this.movie = {title : "", description : ''};
	}
    
	}
	goBack(){
		this.routerExtemtions.backToPreviousPage()
	}
	
	saveForm(){
		if (this.movie.id){
			this.apiService.updateMovie(this.movie.id,this.movie.title,
				this.movie.description).subscribe(
					data =>{
						this.router.navigate(['/items'])
					}, error => {
						const snackbar = new SnackBar()
						snackbar.simple(`The title and description are required`)
					}
				)
		} else {
			this.apiService.createMovie(this.movie.title,
				this.movie.description).subscribe(
					data =>{
						this.router.navigate(['/items'])
					},error => {
						const snackbar = new SnackBar()
						snackbar.simple(`The title and description are required`)
					}
				)
		}
	}

	deleteMovie(){
		this.apiService.deleteMovie(this.movie.id).subscribe(
			data => {
				this.router.navigate(['/items'])
			},
			error => console.log(error)
		)
	}

	getDetails(id : number){
	this.apiService.getMovie(id).subscribe(
		(data:Movie) => {
		this.movie = data;
		this.movieTitle = this.movie.title;
		},
		error => console.log(error)
	)
	}
	
}