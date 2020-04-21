/**
 * SqlDbType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class SqlDbType implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected SqlDbType(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _BigInt = "BigInt";
    public static final java.lang.String _Binary = "Binary";
    public static final java.lang.String _Bit = "Bit";
    public static final java.lang.String _Char = "Char";
    public static final java.lang.String _DateTime = "DateTime";
    public static final java.lang.String _Decimal = "Decimal";
    public static final java.lang.String _Float = "Float";
    public static final java.lang.String _Image = "Image";
    public static final java.lang.String _Int = "Int";
    public static final java.lang.String _Money = "Money";
    public static final java.lang.String _NChar = "NChar";
    public static final java.lang.String _NText = "NText";
    public static final java.lang.String _NVarChar = "NVarChar";
    public static final java.lang.String _Real = "Real";
    public static final java.lang.String _UniqueIdentifier = "UniqueIdentifier";
    public static final java.lang.String _SmallDateTime = "SmallDateTime";
    public static final java.lang.String _SmallInt = "SmallInt";
    public static final java.lang.String _SmallMoney = "SmallMoney";
    public static final java.lang.String _Text = "Text";
    public static final java.lang.String _Timestamp = "Timestamp";
    public static final java.lang.String _TinyInt = "TinyInt";
    public static final java.lang.String _VarBinary = "VarBinary";
    public static final java.lang.String _VarChar = "VarChar";
    public static final java.lang.String _Variant = "Variant";
    public static final java.lang.String _Xml = "Xml";
    public static final java.lang.String _Udt = "Udt";
    public static final java.lang.String _Structured = "Structured";
    public static final java.lang.String _Date = "Date";
    public static final java.lang.String _Time = "Time";
    public static final java.lang.String _DateTime2 = "DateTime2";
    public static final java.lang.String _DateTimeOffset = "DateTimeOffset";
    public static final SqlDbType BigInt = new SqlDbType(_BigInt);
    public static final SqlDbType Binary = new SqlDbType(_Binary);
    public static final SqlDbType Bit = new SqlDbType(_Bit);
    public static final SqlDbType Char = new SqlDbType(_Char);
    public static final SqlDbType DateTime = new SqlDbType(_DateTime);
    public static final SqlDbType Decimal = new SqlDbType(_Decimal);
    public static final SqlDbType Float = new SqlDbType(_Float);
    public static final SqlDbType Image = new SqlDbType(_Image);
    public static final SqlDbType Int = new SqlDbType(_Int);
    public static final SqlDbType Money = new SqlDbType(_Money);
    public static final SqlDbType NChar = new SqlDbType(_NChar);
    public static final SqlDbType NText = new SqlDbType(_NText);
    public static final SqlDbType NVarChar = new SqlDbType(_NVarChar);
    public static final SqlDbType Real = new SqlDbType(_Real);
    public static final SqlDbType UniqueIdentifier = new SqlDbType(_UniqueIdentifier);
    public static final SqlDbType SmallDateTime = new SqlDbType(_SmallDateTime);
    public static final SqlDbType SmallInt = new SqlDbType(_SmallInt);
    public static final SqlDbType SmallMoney = new SqlDbType(_SmallMoney);
    public static final SqlDbType Text = new SqlDbType(_Text);
    public static final SqlDbType Timestamp = new SqlDbType(_Timestamp);
    public static final SqlDbType TinyInt = new SqlDbType(_TinyInt);
    public static final SqlDbType VarBinary = new SqlDbType(_VarBinary);
    public static final SqlDbType VarChar = new SqlDbType(_VarChar);
    public static final SqlDbType Variant = new SqlDbType(_Variant);
    public static final SqlDbType Xml = new SqlDbType(_Xml);
    public static final SqlDbType Udt = new SqlDbType(_Udt);
    public static final SqlDbType Structured = new SqlDbType(_Structured);
    public static final SqlDbType Date = new SqlDbType(_Date);
    public static final SqlDbType Time = new SqlDbType(_Time);
    public static final SqlDbType DateTime2 = new SqlDbType(_DateTime2);
    public static final SqlDbType DateTimeOffset = new SqlDbType(_DateTimeOffset);
    public java.lang.String getValue() { return _value_;}
    public static SqlDbType fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        SqlDbType enumeration = (SqlDbType)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static SqlDbType fromString(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        return fromValue(value);
    }
    public boolean equals(java.lang.Object obj) {return (obj == this);}
    public int hashCode() { return toString().hashCode();}
    public java.lang.String toString() { return _value_;}
    public java.lang.Object readResolve() throws java.io.ObjectStreamException { return fromValue(_value_);}
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumSerializer(
            _javaType, _xmlType);
    }
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumDeserializer(
            _javaType, _xmlType);
    }
    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SqlDbType.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlDbType"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
