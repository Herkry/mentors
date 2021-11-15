<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentMentorConnectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_mentor_connections', function (Blueprint $table) {
            $table->increments("conn_id");
            $table->string("conn_status");
            $table->string("conn_session_rating");
            $table->timestamps();

            $table->integer("std_id")->unsigned();
            $table->foreign("std_id")->references("std_id")->on("students");
            $table->integer("ment_id")->unsigned();
            $table->foreign("ment_id")->references("ment_id")->on("mentors");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_mentor_connections');
    }
}
