odoo.define('pos_customer_ref_search.phygi_order', function (require) {
"use strict";

//
//
//var models = require('point_of_sale.models');
//
//models.load_models([
//{
//model: ‘pos.config’,
//fields: [‘a_ids’, ‘b_id’],
//domain: function(self) {return [[‘id’,’=’, self.pos_session.config_id[0]]]},
//context:{},var PaymentScreenWidget = screens.PaymentScreenWidget;

//loaded: function(self, tables){
//for (var i=0; i < tables.length; i ++) {
//self.table_ids = tables[i].a_ids;
//self.kitchen = tables[i].b_id;
//break;
//}
//},
//},

var screens = require('point_of_sale.screens');
var PaymentScreenWidget = screens.PaymentScreenWidget;
var models = require('point_of_sale.models');
var pos_models = pos_model.PosModel.prototype.models;

    pos_models.push(
        {
            model: 'pos.mlm.orders',
            fields: ['id','customer_id', 'order_number','ref_number','start_date','total_amount',
            'pos_order_id','pos_order_line_id','pos_mlm_line_ids'],
            loaded: function (self, pos_mlm_orders) {
                for (var i in pos_mlm_orders){
                    self.pos_mlm_orders.push(pos_mlm_orders[i]);
                }
            },
        },


            {
            model: 'pos.mlm.orders.line',
            fields: ['id', 'product_id', 'product_subtotal', 'product_qty', 'pos_mlm_order_id'],
            loaded: function (self, pos_mlm_orders_line) {
                self.pos_mlm_orders_line = pos_mlm_orders_line;
            },
        },
  );



//
//
//
//  var result = {
//‘order_no’ : this.pos.name || this.pos.uid || false,
//‘session_id’: this.pos.pos_session.id || false,
//}
//
//var SaleOrder = new Model(‘sale.order’)
//SaleOrder.call(‘sale_order_from_ui’, [result]).then(function(data){return data});



//

    var _super_Order = models.Order.prototype;
    models.Order = models.Order.extend({
        init_from_JSON: function (json) {
            var res = _super_Order.init_from_JSON.apply(this, arguments);

            if (json.create_voucher) {
                this.create_voucher = json.create_voucher
            }

            return res;
        },
        export_as_JSON: function () {
            var json = _super_Order.export_as_JSON.apply(this, arguments);

            if (this.create_voucher) {
                json.create_voucher = this.create_voucher;
            }

            return json;
        },

        get_order_is_create_voucher: function () {
            return this.create_voucher;
        },
        set_order_create_voucher: function () {
            this.create_voucher = !this.create_voucher;
            this.trigger('change');
        }
    });





PaymentScreenWidget.include({


renderElement: function () {
            renderElement: function () {
            var self = this;
            this._super();
            this.$('.js_create_voucher').click(function () { // create voucher
                var selected_order = self.pos.get_order();
                return selected_order.set_order_create_voucher();
            });

        },

});







});
