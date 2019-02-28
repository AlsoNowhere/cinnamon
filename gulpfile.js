
const gulp = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

const src = [
	"./js/root.js",

	"./js/common/*.js",
	"./js/movement/*.js",

	"./js/render.js",
	"./js/main.js"
];

gulp.task("build-js",function(){
	return gulp.src(src)
		.pipe(sourcemaps.init())
		.pipe(concat("Cinnamon.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./dist/"));
});

gulp.task("watch-js",function(){
	gulp.watch(src ["build-js"]);
});

gulp.task("default", ["build-js"]);
