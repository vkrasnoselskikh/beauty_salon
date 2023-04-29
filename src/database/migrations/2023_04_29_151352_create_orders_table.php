<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('first_name',255);
            $table->string('last_name', 255);
            $table->string('phone', 25);
            $table->string('email', 255);
            $table->timestamps();
        });

        Schema::create('orders_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->string('description',255);
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('client_id')->unsigned();
            $table->bigInteger('status_id')->unsigned();
            $table->text('description');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('status_id')->references('id')->on('orders_statuses');
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name', 255);
            $table->text('description');
            $table->float('price');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('services_to_order', function (Blueprint $table) {
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('service_id')->unsigned();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });

        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name', 255);
            $table->integer('quantity')->unsigned();
            $table->string('unit of measure');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('material_to_services', function (Blueprint $table) {
            $table->bigInteger('material_id')->unsigned();
            $table->bigInteger('service_id')->unsigned();

            $table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign('clients_user_id_foreign');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign('orders_user_id_foreign');
            $table->dropForeign('orders_client_id_foreign');
            $table->dropForeign('orders_status_id_foreign');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign('services_user_id_foreign');
        });

        Schema::table('services_to_order', function (Blueprint $table) {
            $table->dropForeign('services_to_order_order_id_foreign');
            $table->dropForeign('services_to_order_service_id_foreign');
        });

        Schema::table('materials', function (Blueprint $table) {
            $table->dropForeign('materials_user_id_foreign');
        });

        Schema::table('material_to_services', function (Blueprint $table) {
            $table->dropForeign('material_to_services_material_id_foreign');
            $table->dropForeign('material_to_services_service_id_foreign');
        });


        Schema::dropIfExists('clients');
        Schema::dropIfExists('orders_statuses');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('services');
        Schema::dropIfExists('services_to_order');
        Schema::dropIfExists('materials');
        Schema::dropIfExists('material_to_services');
    }
};
