<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMentorAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mentor_attributes', function (Blueprint $table) {
            $table->increments("ment_attributes_id");
            $table->string("industry_1");
            $table->string("industry_2");
            $table->string("skill_1");
            $table->string("skill_2");
            $table->timestamps();

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
        Schema::dropIfExists('mentor_attributes');
    }
}
