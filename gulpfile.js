
var gulp            = require('gulp'),
watch               = require('gulp-watch'),
postcss             = require('gulp-postcss'),
autoprefixer        = require('autoprefixer'),
cssvars             = require('postcss-simple-vars'),
cssnested           = require('postcss-nested'),
cssimport           = require('postcss-import'),
browserSync         = require('browser-sync').create();        

gulp.task('default', function(){        // gulp needs default task
    console.log('GULP DEFAULT TASK');
});

gulp.task('html', function(){           // reload browser when html updates
    browserSync.reload();
});

gulp.task('styles', function(){     // pipe css file through post-css filters to temp dir
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssimport, cssvars, cssnested, autoprefixer]))      // postcss + autoprefixer create vendor prefixes for css     
    .pipe(gulp.dest('./app/temp/styles'));              // cssimport will replace @import with text from css styles (modules)
});                                                 // cssvars lets you use variables in css
                                                    // cssnested lets you nest css styles (ie SASS)

gulp.task('watch', function(){  
    
    browserSync.init({                      // set browsersync server
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function(){    // watch changes to hmtl files
        gulp.start('html'); 
    });

    watch('./app/assets/styles/**/*.css', function(){   // watch changes to css files
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'], function(){
    gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

