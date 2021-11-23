<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToStudentsTableNMentorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // add std_pass column
        Schema::table('students', function (Blueprint $table) {
            //
            $table->string("std_pass");
        });

        // add ment_pass column
        Schema::table('mentors', function (Blueprint $table) {
            //
            $table->string("ment_pass");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            //
        });

        Schema::table('mentors', function (Blueprint $table) {
            //
        });
    }
}
