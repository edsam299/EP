/**
 * SqlCompareOptionsNull.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class SqlCompareOptionsNull implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected SqlCompareOptionsNull(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _None = "None";
    public static final java.lang.String _IgnoreCase = "IgnoreCase";
    public static final java.lang.String _IgnoreNonSpace = "IgnoreNonSpace";
    public static final java.lang.String _IgnoreKanaType = "IgnoreKanaType";
    public static final java.lang.String _IgnoreWidth = "IgnoreWidth";
    public static final java.lang.String _BinarySort = "BinarySort";
    public static final java.lang.String _BinarySort2 = "BinarySort2";
    public static final SqlCompareOptionsNull None = new SqlCompareOptionsNull(_None);
    public static final SqlCompareOptionsNull IgnoreCase = new SqlCompareOptionsNull(_IgnoreCase);
    public static final SqlCompareOptionsNull IgnoreNonSpace = new SqlCompareOptionsNull(_IgnoreNonSpace);
    public static final SqlCompareOptionsNull IgnoreKanaType = new SqlCompareOptionsNull(_IgnoreKanaType);
    public static final SqlCompareOptionsNull IgnoreWidth = new SqlCompareOptionsNull(_IgnoreWidth);
    public static final SqlCompareOptionsNull BinarySort = new SqlCompareOptionsNull(_BinarySort);
    public static final SqlCompareOptionsNull BinarySort2 = new SqlCompareOptionsNull(_BinarySort2);
    public java.lang.String getValue() { return _value_;}
    public static SqlCompareOptionsNull fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        SqlCompareOptionsNull enumeration = (SqlCompareOptionsNull)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static SqlCompareOptionsNull fromString(java.lang.String value)
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
        new org.apache.axis.description.TypeDesc(SqlCompareOptionsNull.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlCompareOptions>null"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
