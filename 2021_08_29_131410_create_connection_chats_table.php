<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConnectionChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('connection_chats', function (Blueprint $table) {
            $table->increments("chat_id");
            $table->string("chat_msg");
            $table->string("chat_type");
            $table->string("chat_sender_type");
            $table->timestamps();

            $table->integer("conn_id")->unsigned();
            $table->foreign("conn_id")->references("conn_id")->on("student_mentor_connections");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('connection_chats');
    }
}